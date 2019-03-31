import * as React from "react";
import {Fragment} from "react";
import {Helmet} from "react-helmet";
import {Button, Collapse, Icon, message, Tree} from 'antd';
import {LessonEntity} from "../../../../../common/types/lesson";
import {ApiEntity} from "../../../../../common/types";
import {toArray} from "../../../../../helpers/Function";
import {RouteComponentProps} from "react-router";
import {LessonModal} from "../../../../modal/lesson/components/LessonModal";
import {Loader} from "../../../../loader/components/loader";

const DirectoryTree = Tree.DirectoryTree;
const {TreeNode} = Tree;
const Panel = Collapse.Panel;

export interface Props extends RouteComponentProps<any, any> {
    lessons: LessonEntity[];
    api: ApiEntity;
    props: any;

    fetchLessons(parameters): void;

    deleteLesson(parameters): Promise<any>;

    editLesson(parameters): Promise<any>;

    createLesson(parameters): Promise<any>;
}

export interface State {
    visible: boolean;
    loading: boolean;
    lesson: LessonEntity;
    start_time: any;
    end_time: any;
    listLesson: LessonEntity[];
}

export class ListLesson extends React.Component<Props, State, {}> {

    public _createLesson = params => {
        this.props.createLesson(params)
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchLessons({course_id: params.course_id});
                }
            })
    }
    public onClickCreate = () => {
        this._showModal();
    }
    public _closeModal = () => {
        this.setState({
            visible: false
        })
    }
    public _showModal = () => {
        this.setState({
            visible: true
        })
    }
    public _deleteLesson = params => {
        this.props.deleteLesson({course_id: params.course_id, id: params.lessonId})
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchLessons({course_id: params.course_id});
                }
            })
    }
    public _editLesson = params => {
        this.props.editLesson(params)
            .then(response => {
                if (response && response.status == "success") {
                    message.success('Successful!');
                    this.props.fetchLessons({course_id: params.course_id});
                }
            })
    }
    public onChangeStatusLesson = (event, item) => {
        console.log("change", event);
        console.log("item", item);
    }
    onSelect = () => {
        console.log('Trigger Select');
    };
    onExpand = () => {
        console.log('Trigger Expand');
    };
    addAction = (event) => {
        console.log("add");
        event.stopPropagation();
    }
    editAction = (event) => {
        console.log("edit");
        event.stopPropagation();
    }
    deleteAction = (event) => {
        console.log("delete");
        event.stopPropagation();
    }
    private showListLesson = () => {
        var {lessons} = this.props;
        // console.log("lessons", lessons);
        lessons = toArray(lessons);
        const customTitle = <Fragment>
            aahiahia
            <Button className="float-right btn-delete" icon="close" onClick={(event) => this.deleteAction(event)}/>
            <Button className="float-right btn-edit" icon="edit" onClick={(event) => this.editAction(event)}/>
            <Button className="float-right btn-add" icon="plus" onClick={(event) => this.addAction(event)}/>
        </Fragment>
        const extra_edit_delete = <Fragment>
            <Button className="float-right btn-header-topic-delete" icon="close"
                    onClick={(event) => this.deleteAction(event)}/>
            <Button className="float-right btn-header-topic-add-edit" icon="edit"
                    onClick={(event) => this.editAction(event)}/>
            <Button className="float-right btn-header-topic-add-edit" icon="plus"
                    onClick={(event) => this.addAction(event)}/>
        </Fragment>
        const children = <TreeNode title={customTitle} key={`2`}>
            <TreeNode title={customTitle} key={`6`}>
                <TreeNode title={customTitle} key={`19`} isLeaf/>
            </TreeNode>
            <TreeNode title={customTitle} key={`0`} isLeaf/>
        </TreeNode>

        if (lessons && lessons.length)
            return lessons.map((item, index) => {
                return (
                    <Collapse
                        destroyInactivePanel={true}
                        className="w-100"
                        bordered={false}
                        defaultActiveKey={['0']}
                        expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}
                        onChange={(event) => this.onChangeStatusLesson(event, item)}
                        accordion={true}
                    >
                        {/*--------------------------một bài------------------------------*/}
                        <Panel header={item.name} key={item.id} className="customPanelStyle"
                               extra={extra_edit_delete}>
                            <p>
                                <DirectoryTree
                                    multiple
                                    defaultExpandAll={false}
                                    onSelect={this.onSelect}
                                    onExpand={this.onExpand}
                                    expandAction={"doubleClick"}
                                >
                                    {/*------------------------show bài con-----------------------------*/}
                                    {/*{children}*/}
                                    {this.showChildren(item)}
                                </DirectoryTree>
                            </p>
                        </Panel>
                    </Collapse>
                );
            });
    }

    constructor(props) {
        super(props);
        this.state = {
            listLesson: [],
            visible: false,
            loading: false,
            start_time: (new Date()).getDate(),
            end_time: new Date(),
            lesson: new class implements LessonEntity {
                id: string;
                actionType: string;
                avatar: string;
                childrent_type: number;
                course_id: number;
                description: string;
                duration: number;
                end_time: number;
                level: number;
                name: string;
                order_index: number;
                parent_id: number;
                pass: number;
                password: string;
                question_number: number;
                score_scale: number;
                short_description: string;
                sort_id: number;
                start_time: number;
                status: number;
                tag: string;
                time_practice: number;
                total_card_num: number;
                user_id: number;
                user_name: string;
            }
        }
    }

    componentWillMount() {
        console.log("aaaaaaaaa", this.props.params.id);
        let course_id = this.props.params.id;
        this.props.fetchLessons({course_id: course_id, parent_id: course_id});
    }

    public showChildren(item) {
        // console.log("item", item);
        let course_id = this.props.params.id;
        const customTitle = <Fragment>
            aahiahia
            <Button className="float-right btn-delete" icon="close" onClick={(event) => this.deleteAction(event)}/>
            <Button className="float-right btn-edit" icon="edit" onClick={(event) => this.editAction(event)}/>
            <Button className="float-right btn-add" icon="plus" onClick={(event) => this.addAction(event)}/>
        </Fragment>
        return <TreeNode title={customTitle} key={`3`}>
            <TreeNode title={customTitle} key={`64`}>
                <TreeNode title={customTitle} key={`192`} isLeaf/>
            </TreeNode>
            <TreeNode title={customTitle} key={`22`} isLeaf/>
        </TreeNode>
    }

    public render() {
        let {api} = this.props;
        let {visible, lesson} = this.state;


        return (
            <Fragment>
                <div className="row m-3 w-100">
                    {api.loadings > 0 ? <Loader/> : this.showListLesson()}
                    <div className="row w-100">
                        <Button type="primary" className="item_button w-100" icon="plus"
                                onClick={this.onClickCreate}>
                            Add a lesson
                        </Button>
                    </div>
                    <div className="col">
                        <LessonModal
                            fetchLessons={this.props.fetchLessons}
                            lesson={lesson}
                            handleLesson={this._createLesson}
                            title={"Create a lesson"}
                            visible={visible}
                            course_id={this.props.params.id}
                            closeModal={this._closeModal}
                            showModal={this._showModal}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}
