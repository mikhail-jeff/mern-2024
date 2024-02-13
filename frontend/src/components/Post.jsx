import { formatDistanceToNow } from "date-fns";

// const options = {
// 	year: "numeric",
// 	month: "long",
// 	day: "numeric",
// 	hour: "2-digit",
// 	minute: "2-digit",
// 	second: "2-digit",
// 	hour12: true,
// };

const Post = ({ post, children }) => {
	const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

	return (
		<div className="mb-6">
			<div className="flex items-start justify-between">
				<div>
					<h1 className="font-bold text-lg text-indigo-600 first-letter:uppercase">{post.title}</h1>
					{/* <p className="text-[10px] text-slate-500">{new Date(post.createdAt).toLocaleDateString(undefined, options)}</p> */}

					{/* using date-fns */}
					<p className="text-[10px] text-slate-500">posted {timeAgo}</p>
				</div>

				<div>{children}</div>
			</div>

			<p className="text-base mt-4">{post.body}</p>

			<div className="h-px w-full bg-gradient-to-r from-indigo-50 via-indigo-500 to-indigo-50 mt-6"></div>
		</div>
	);
};

export default Post;
