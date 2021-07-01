import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugRemoved,
  bugResolved,
  assigneeAdded,
  getUnresolvedBugs,
  getBugsByUser,
  bugsReceived,
  loadBugs,
  addBug,
  resolveBug,
  setAssignee,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { getRandomUser, userAdded } from "./store/users";
import { apiCallBegan } from "./store/api";

const store = configureStore();

// store.dispatch(userAdded({ name: "Abdullah" }));

// store.dispatch(
//   bugAdded({
//     description: "Abd",
//   })
// );

// store.dispatch(
//   assigneeAdded({
//     id: 0,
//     assigneeId: getRandomUser(store.getState()).id,
//   })
// );

// store.dispatch(bugResolved({ id: 0 }));

// const unsubscribed = store.subscribe(() => {
//   store.getState();
// });

// store.dispatch(projectAdded({ name: "Project 1" }));

// console.log(getUnresolvedBugs(store.getState()));

// console.log(getBugsByUser(1)(store.getState()));

// store.dispatch((dispatch, getState) => {
//   dispatch(userAdded({ name: "Abdullah 2" }));
// });

// store.dispatch((dispatch, getState) => {
//   dispatch({ type: "error", payload: { message: "message" } });
// });

// store.dispatch({
//   type: apiCallBegan.type,
//   payload: {
//     url: "/bugs",
//     method: "get",
//     data: {},
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// });
store.dispatch(loadBugs());

// store.dispatch(
//   addBug({
//     description: "Abdillah bug",
//   })
// );
setTimeout(() => {
  debugger;
  const bugId = store.getState().entities.bugs.list[4].id;
  store.dispatch(resolveBug(bugId));

  store.dispatch(setAssignee(bugId, "asdadada"));
}, 2000);
