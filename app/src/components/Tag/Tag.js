import React from 'react';

import { Tag, Icon } from 'antd';

import './Tag.css';

export default class Tags extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			more: false
		}

		this.renderTags = this.renderTags.bind(this);
		this.openMore = this.openMore.bind(this);

		this.tags = props.tags;
	}

	openMore() {

		this.setState({more: !this.state.more})
	}

	renderTags() {
		let tags = this.tags;

		if (!this.state.more && tags.length > 3) {
			tags = this.props.tags
				.filter((el, i) => i < 3)
				.map((el, i) => el.length > 0 && <MyTag key={i} name={el}/>);
			if (this.props.tags.length > 3) {
				tags.push(<Tag key="4" onClick={this.openMore}><Icon type="ellipsis" /></Tag>)
			}
		} else {
			tags = this.props.tags.map((el, i) => el.length > 0 && <MyTag key={i} name={el}/>);
		}

		return tags;
	}

	render() {
		return (
			<div className="tags" ref={this.container}>
				{
					this.renderTags()
				}
			</div>
		);
	}
}

const MyTag = ({name, onClick}) => {
	return <Tag onClick={onClick ? onClick : () => {}}>{name}</Tag>
}