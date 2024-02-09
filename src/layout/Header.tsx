import { Button } from "@mui/material";
import {
  BASE_PATH,
  UPLOAD_TEXT_PAGE_PATH,
  UPLOAD_VOICE_PAGE_PATH,
} from "common";
import { FC } from "common/types";
import { useLocation, useNavigate } from "react-router-dom";

const Header: FC<{}> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full max-h-16 min-h-16 bg-gray-800 px-4 py-4">
      <nav>
        <ul className="flex gap-x-5">
          <li>
            <Button
              variant="contained"
              color={isActive(UPLOAD_TEXT_PAGE_PATH) ? "primary" : "inherit"}
              onClick={() => navigate(UPLOAD_TEXT_PAGE_PATH, { replace: true })}
            >
              Upload Text
            </Button>
          </li>
          <li>
            <Button
              variant="contained"
              color={isActive(UPLOAD_VOICE_PAGE_PATH) ? "primary" : "inherit"}
              onClick={() =>
                navigate(UPLOAD_VOICE_PAGE_PATH, { replace: true })
              }
            >
              Upload Voice
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
