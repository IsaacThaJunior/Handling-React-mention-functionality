import React from 'react';
import { useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import styles from './FormInputStyle.module.css';
import mentionsInputStyle from './mentionsInputStyle';
import mentionStyle from './mentionStyle';

const CustomForm = () => {
	const [formState, setFormState] = useState({
		username: '',
		comment: '',
	});

	const [comments, setComments] = useState([]);

	const users = [
		{
			id: 'isaac',
			display: 'Isaac Newton',
		},
		{
			id: 'sam',
			display: 'Sam Victor',
		},
		{
			id: 'emma',
			display: 'emmanuel@nobody.com',
		},
	];

	const submit = (e) => {
		e.preventDefault();
		if (formState.username === '' || formState.comment === '') {
			alert('Please fill in all fields');
			return;
		}

		setComments((comments) => [
			...comments,
			{
				username: formState.username,
				comment: formState.comment,
			},
		]);

		setFormState({
			username: '',
			comment: '',
		});
	};

	const current = new Date();
	const date = `${current.getDate()}/${
		current.getMonth() + 1
	}/${current.getFullYear()}`;

	return (
		<div className={styles.form}>
			<section className={styles.formCard}>
				<h2 className={styles.formTitle}>Comment Form</h2>
				<input
					type="text"
					value={formState.username}
					onChange={(e) =>
						setFormState({ ...formState, username: e.target.value })
					}
					placeholder="Input Your Name"
				/>
				<MentionsInput
					placeholder="Add Comment. Use '@' for mention and '&' for emojis"
					value={formState.comment}
					onChange={(e) =>
						setFormState({ ...formState, comment: e.target.value })
					}
					style={mentionsInputStyle}
					a11ySuggestionsListLabel={'Suggested mentions'}
				>
					<Mention style={mentionStyle} data={users} />
				</MentionsInput>
				<button onClick={submit}>Submit</button>
			</section>

			{comments.length === 0 ? (
				null
			) : (
				<section>
					{comments.map((comment, i) => (
						<div className={styles.commentCard} key={i}>
							<p className={styles.username}>
								{comment.username} on {date}
							</p>
							<h2>{comment.comment}</h2>
						</div>
					))}
				</section>
			)}
		</div>
	);
};

export default CustomForm;
