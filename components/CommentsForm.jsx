import React, { useRef, useState, useEffect } from "react";
import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
	const [error, setError] = useState(false);
	const [localStorage, setLocalStorage] = useState(null);
	const [showSuccesMessage, setshowSuccesMessage] = useState(false);

	const commentEl = useRef();
	const nameEl = useRef();
	const emailEl = useRef();
	const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
  }, [])

	const handleComment = () => {
		setError(false);

		const { value: comment } = commentEl.current;
		const { value: name } = nameEl.current;
		const { value: email } = emailEl.current;
		const { checked: storeData } = storeDataEl.current;

		if (!comment || !name || !email) {
			setError(true);
			return;
		}

		const commentObj = {
			name,
			email,
			comment,
			slug,
		};

		if (storeData) {
			window.localStorage.setItem("name", name);
			window.localStorage.setItem("email", email);
		} else {
			window.localStorage.removeItem("name", name);
			window.localStorage.removeItem("email", email);
		}

		submitComment(commentObj).then((res) => {
			setshowSuccesMessage(true);

			setTimeout(() => {
				setshowSuccesMessage(false);
			}, 3000);
		});
	};

	return (
		<div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4'>Comments</h3>
			<div className='grid grid-col-1 gap-4 mb-4'>
				<textarea
					ref={commentEl}
					className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
					placeholder='Comment'
					name='comment'
				/>
			</div>
			<div className='grid grid-col-1 lg:grid-cols-2 gap-4 mb-4'>
				<input
					type='text'
					ref={nameEl}
					className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
					placeholder='Name'
					name='name'
				/>
				<input
					type='text'
					ref={emailEl}
					className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200'
					placeholder='Email'
					name='email'
				/>
			</div>
			<div className='grid grid-col-1 gap-4 mb-4'>
				<div className=''>
					<input
						ref={storeDataEl}
						type='checkbox'
						id='storeData'
						name='storeData'
					/>
					<label className='text-gray-500 cursor-pointer ml-2'>
						Save my data for the next comment
					</label>
				</div>
			</div>
			{error && <p className='text-s text-red-500'>All field are requried</p>}
			<div className='mt-8'>
				<button
					type='button'
					onClick={handleComment}
					className='transition duration-500 ease hover:bg-indigo-500 inline-block py-4 px-6 bg-cyan-600 rounded-full text-white'>
					Post Comment
				</button>
				{showSuccesMessage && (
					<span className='text-green-500 text-xl float-right mt-3 font-semibold'>
						Comment submitted for review
					</span>
				)}
			</div>
		</div>
	);
};

export default CommentsForm;
