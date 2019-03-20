import { combineReducers } from 'redux';
import { ApiEntity } from '../common/types';
import { apiReducer } from './api';
import { CourseEntity } from '../modules/course/components/course_info/types';
import { reducer as reduxFormReducer } from 'redux-form';
import { listCourseReducer } from '../modules/home/components/courses/reducer';
import { courseReducer } from '../modules/course/components/course_info/reducer';

export interface State {
  api: ApiEntity;
  form: any;
  listCourse: CourseEntity;
  course: CourseEntity;
};

export const state = combineReducers<State>({
  api: apiReducer,
  form: reduxFormReducer,
  listCourse: listCourseReducer,
  course: courseReducer
});
