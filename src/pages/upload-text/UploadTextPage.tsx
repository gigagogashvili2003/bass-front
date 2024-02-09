import { Button, TextareaAutosize } from "@mui/material";
import { FC } from "common/types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadTextPage: FC<{}> = (props) => {
  function uploadTextHandler() {
    console.log("Uploading text");
  }

  return (
    <div className="flex flex-col items-center gap-y-6 p-8">
      <TextareaAutosize
        className="p-4 w-full text-lg text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none outline-none transition-all duration-300 ease-in-out"
        placeholder="Enter your text here..."
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={uploadTextHandler}
        startIcon={<CloudUploadIcon />}
        className="w-48 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Upload Text
      </Button>
    </div>
  );
};

export default UploadTextPage;
