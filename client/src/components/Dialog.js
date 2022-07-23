export default function Dialog(props) {
  const { isShown, title, body, CTA } = props;

  return (
    <dialog open={isShown}>
      <Dialog.Header>{title}</Dialog.Header>
      <Dialog.Body>{body}</Dialog.Body>
      <Dialog.Footer>{CTA}</Dialog.Footer>
    </dialog>
  );
}

Dialog.Header = function (props) {
  const { children, className } = props;

  return <header className={className}>{children}</header>;
};

Dialog.Footer = function (props) {
  const { children, className } = props;

  return <footer className={className}>{children}</footer>;
};

Dialog.Body = function (props) {
  const { children, className } = props;

  return <div className={className}>{children}</div>;
};
