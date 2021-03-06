import * as React from "react";
import {Fragment} from "react";
import {Checkbox} from "antd";

const quetionOptions = ['Chọn đáp án', 'Điền từ', 'Lật mặt', 'Phát âm'];
const defaultCheckedList = ['Chọn đáp án', 'Lật mặt'];
const CheckboxGroup = Checkbox.Group;

export interface Props {
    visible: boolean;
}

export interface State {
    checkedList: Array<string>;
    indeterminate: boolean;
    checkAll: boolean;
}

export class QuestionTypeSetting extends React.Component<Props, State, {}> {
    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < quetionOptions.length), //indeterminate bang true khi co 1 so option dc checked nhung ko check het
            checkAll: checkedList.length === quetionOptions.length,
        });
    };
    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? quetionOptions : [], //neu nut checked dc check thi tra ve full list con ko thi tra ve []
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
        }
    }

    public showCheckBox() {
        return <Fragment>
            <div>
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}   //neu checked = true thi tat ca dc check va nguoc lai
                >
                    Check all
                </Checkbox>
            </div>
            <br/>
            <CheckboxGroup
                className="inline-grid"
                options={quetionOptions} //tong options
                value={this.state.checkedList} //list danh muc dc check
                onChange={this.onChange}/>
        </Fragment>
    }

    public render() {
        let {visible} = this.props;
        return (
            visible ? this.showCheckBox() : <div className="mt-5"></div>
        );
    }
}
