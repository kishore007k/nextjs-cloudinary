/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useState } from "react";

const Upload = () => {
	const [selectedImage, setSelectedImage] = useState("");
	const [cloudUrl, setCloudUrl] = useState("");

	const handleUpload = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", selectedImage);
		formData.append("upload_preset", "nextjs_blog_app");

		axios
			.post("https://api.cloudinary.com/v1_1/ecsite/image/upload", formData)
			.then((res) => {
				setCloudUrl(res.data.url);
			})
			.catch((err) => console.error(err));
	};

	return (
		<div>
			<div>
				<h1>Upload Component</h1>
			</div>
			<div>
				<input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />

				{cloudUrl && (
					<div className="w-96 h-96">
						<img
							src={cloudUrl}
							alt="bgImage"
							className="object-cover w-full h-full rounded-full"
						/>
					</div>
				)}
			</div>

			<button onClick={handleUpload}>Upload</button>
		</div>
	);
};

export default Upload;
