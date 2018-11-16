import React from 'react';

import './List.css';

import Tags from '../Tag/Tag';

const ListItem = (props) => {
	return(
		<div className="list__item">
			<div className="list__col list__col_id">{props.i + 1}</div>
			<div className="list__col list__col_name"><a href={props.link}>{props.name}</a></div>
			<div className="list__col list__col_tags">
				{
					props.tags && props.tags.length > 0 &&
						<Tags tags={props.tags} />
				}
			</div>
			<div className="list__col list__col_assigned">{props.assigned ? props.assigned : 'not assigned'}</div>
		</div>
	);
}

export default (props) => {
	return(
		<div className="list">
			{
				props.data
				?
					props.data.map((el, i) => {
						return <ListItem {...el} i={i} key={i}/>
					})
				:
					<div>Нет вишек</div>

			}
		</div>
	);
}