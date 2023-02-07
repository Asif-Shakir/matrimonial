import style from './card.module.css';
const Card = ({ cardCss, children }) => {
  return (
    <div
      className={style.card}
      style={{
        minHeight: cardCss?.minHeight
          ? cardCss?.minHeight
          : undefined,
      }}
    >
      <div className={style.card_header}>
        <p className={style.header_title}>Add City</p>
      </div>
      <div className={style.card_body}>{children}</div>
    </div>
  );
};
export default Card;
