import style from './card.module.css';
const Card = ({ heading,cardCss, children }) => {
  return (
    <div
      className={style.card}
      style={{
        minHeight: cardCss?.minHeight
          ? cardCss?.minHeight
          : undefined,
      }}
    >
      <div className={`${style.card_header} text-capitalize`}>
        <p className={style.header_title}>{heading }</p>
      </div>
      <div className={style.card_body}>{children}</div>
    </div>
  );
};
export default Card;
