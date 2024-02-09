import { UPLOAD_TEXT_PAGE_PATH, UPLOAD_VOICE_PAGE_PATH } from "../common";
import { MainLayout } from "../layout";
import UploadTextPage from "../pages/upload-text/UploadTextPage";
import UploadVoicePage from "../pages/upload-voice/UploadVoicePage";

export const routes = [
  {
    Component: UploadVoicePage,
    path: UPLOAD_VOICE_PAGE_PATH,
    Layout: MainLayout,
  },
  {
    Component: UploadTextPage,
    path: UPLOAD_TEXT_PAGE_PATH,
    Layout: MainLayout,
  },
];
