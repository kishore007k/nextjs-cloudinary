This is a [Next.js](https://nextjs.org/) project built with the image upload to the [`Cloudinary`](https://cloudinary.com/).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Upload

The Image `Upload` Component is created inside the *Components* folder in the root directory.

To connect to the cloud you should create a preset in the settings.
Follow the following steps

- Go to the Settings Tab

![Web capture_26-9-2021_03843_cloudinary com](https://user-images.githubusercontent.com/34863222/134783630-88b4619a-2974-48b6-8fda-8669634cb2cc.jpeg)

- Move to Upload Tab

![Web capture_26-9-2021_03917_cloudinary com](https://user-images.githubusercontent.com/34863222/134783631-7711aaa1-0af7-463c-8098-665bf2471b96.jpeg)

- Navigate to the Upload Presets and click on `Add upload preset`.

![Web capture_26-9-2021_03932_cloudinary com](https://user-images.githubusercontent.com/34863222/134783632-6f33d8f9-9df5-4f5d-9a72-8ca6a06869ee.jpeg)

- In the Upload Preset Name give a name to the preset. Remember this name will be used to use this preset to upload the images to the Cloudinary.

![Web capture_26-9-2021_03945_cloudinary com](https://user-images.githubusercontent.com/34863222/134783634-7addc192-1c53-4de4-bd15-67ec233e7fb3.jpeg)

## Code in the Upload Component

```js
import axios from "axios";
import { useState } from "react";

const Upload = () => {
	const [selectedImage, setSelectedImage] = useState("");
	const [cloudUrl, setCloudUrl] = useState("");

  // Here the preset_name is the name you used to create the preset
  // and the cloud_name is the name of your cloud.

	const handleUpload = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", selectedImage);
		formData.append("upload_preset", preset_name);

		axios
			.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
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
```