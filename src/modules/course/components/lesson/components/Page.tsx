import * as React from "react";
import {Helmet} from "react-helmet";
import "../../../../../public/css/custom.scss";
import {Modal, Button} from 'antd';
import {Lesson} from './Lesson';

export interface Props {
}

export interface State {
    title: Array<string>
}

export class ListLesson extends React.Component<Props, State, {}> {
    constructor(props) {
        super(props);
        this.state = {
            title: ["Lesson 1", "Lesson 2", "Lesson 3","Lesson 4","Lesson 5","Lesson 6","Lesson 7","Lesson 8"]
        }
    }

    private showListLesson = () => {
        let result = [];
        this.state.title.map((item, index) => {
            result.push(<Lesson children={item}/>);
        });
        return result;
    }

    public render() {
        return (
            <div className="row container offset-2 mt-5">
                {this.showListLesson()}
            </div>
        );
    }
}
