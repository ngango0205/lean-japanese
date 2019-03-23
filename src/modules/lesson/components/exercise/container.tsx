import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../../../reducers/reducers';
import {deleteExerciseAction, fetchListExerciseAction} from "../../../../reducers/exercise";
import {ListExercise} from "./components/Page";


const mapStateToProps = (state: State) => ({
    listExercise: state.listExercise
});
  
const mapDispatchToProps = (dispatch) => ({
    fetchListExercise : parameters => dispatch(fetchListExerciseAction(parameters)),
    deleteExercise: parameters => dispatch(deleteExerciseAction(parameters))
});

export const ListExerciseContainter = connect(
mapStateToProps,
mapDispatchToProps
)(ListExercise);
