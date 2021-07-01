import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },

    bugRemoved: (bugs, action) => {
      return bugs.list.filter((b) => b.id !== action.payload.id);
    },

    bugResolved: (bugs, action) => {
      bugs.list.find((b) => b.id === action.payload.id).resolved = true;
    },

    assigneeAdded: (bugs, action) => {
      bugs.list.find((b) => b.id === action.payload.id).userId =
        action.payload.userId;
    },

    bugsReceived: (bugs, action) => {
      bugs.list.push(...action.payload);
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
  },
});

// NOTE: These reducer method should not be exported, instead only action creators that are wrapper to
// these reducer actions should be exported to descrease coupling
const {
  bugAdded,
  bugRemoved,
  bugResolved,
  assigneeAdded,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;

export default slice.reducer;

// ------ ACTION CREATORS -------

const url = "/bugs";

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  if (moment().diff(moment(lastFetch), "minutes") < 10) {
    return;
  }

  dispatch(
    apiCallBegan({
      url,
      onSuccess: bugsReceived.type,
      onStart: bugsRequested.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    data: bug,
    method: "post",
    onSuccess: bugAdded.type,
    // onStart: bugsRequested.type,
    // onError: bugsRequestFailed.type,
  });

export const resolveBug = (bugId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    data: { resolved: true },
    method: "patch",
    onSuccess: bugResolved.type,
    // onStart: bugsRequested.type,
    // onError: bugsRequestFailed.type,
  });

export const setAssignee = (bugId, userId) =>
  apiCallBegan({
    url: `${url}/${bugId}`,
    data: { userId },
    method: "patch",
    onSuccess: assigneeAdded.type,
    // onStart: bugsRequested.type,
    // onError: bugsRequestFailed.type,
  });

// ------ SELECTOR -----

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((b) => !b.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((b) => b.assigneeId === userId)
  );
