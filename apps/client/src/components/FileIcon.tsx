import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import LinkIcon from "@mui/icons-material/Link";

export function FileIcon({ fileType }: { fileType: string }) {
  if (fileType === "pdf")
    return <PictureAsPdfIcon fontSize="large" color="error" />;
  if (["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"].includes(fileType))
    return <ImageIcon fontSize="large" color="primary" />;
  if (["mp4", "webm", "avi", "mov"].includes(fileType))
    return <VideoFileIcon fontSize="large" color="secondary" />;
  if (fileType === "link") return <LinkIcon fontSize="large" color="action" />;

  return <InsertDriveFileIcon fontSize="large" />;
}
