export function Hamburger(props: { onClick: () => any }) {
  return (
    <div className="burger" {...props}>
      <div className="meat-1" />
      <div className="meat-2" />
      <div className="meat-3" />
    </div>
  );
}
