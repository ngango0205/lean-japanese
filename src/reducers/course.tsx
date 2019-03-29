import { CourseEntity } from "../common/types/course";
import * as request from "../api/request";
import { requestAxios } from "../redux/api";

export const FETCH_COURSE = "course/FETCH_COURSE";
export const FETCH_COURSE_ERROR = "course/FETCH_COURSE_ERROR";

export const fetchCourseAction = parameters => dispatch => {
  dispatch(requestAxios(request.showCourse(parameters)))
    .then(response => {
      dispatch({
        type: FETCH_COURSE,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_COURSE_ERROR,
        payload: {},
        responseError: error
      });
    });
};

export const courseReducer = (state: CourseEntity = null, action) => {
  const { type, payload = {}, responseError = {} } = action;
  state = { ...state, actionType: action.type };
  switch (type) {
    case FETCH_COURSE:
      return {...state, course: {...payload}};
    case FETCH_COURSE_ERROR:
      return { ...state, ...payload, responseError };
  }

  return state;
};
