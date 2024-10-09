import { Toast, ToastContainer } from "react-bootstrap";

export default function PopUp({
  message,
  setMessage,
}: {
  message: string | null;
  setMessage: (message: string | null) => void;
}) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        className="mt-3 p-3"
        show={!!message}
        delay={3000}
        autohide
        onClose={() => setMessage(null)}
      >
        {message}
      </Toast>
    </ToastContainer>
  );
}
