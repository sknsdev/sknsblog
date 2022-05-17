import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { getComments } from "../services";

const Comments = ({ slug }) => {
	const [comments, setcomments] = useState([]);

	useEffect(() => {
		getComments(slug).then((result) => setcomments(result));
	}, [slug]);

	return (
		<div>
			{comments.length && (
				<div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
					<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
						{comments.length} Comments
					</h3>
					{comments.map((comment) => (
						<div
							key={comment.createdAt}
							className='border-b border-gray-100 pb-4 mb-4'>
							<p className='mb-4'>
								<span className='text-gray-700 font-semibold'>
									{comment.name}
								</span>
								{" - "} {moment(comment.createdAt).format("DD.MM YYYY, hh-mm")}
							</p>
							<p className='whitespace-pre-line text-gray-500 w-full'>
								{parse(comment.comment)}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Comments;
