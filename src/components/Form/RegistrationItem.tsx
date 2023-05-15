import style from './style.module.scss' 

const RegistrationItem = ({title,...register}: { name?: string ,title?: string; type?: string; error?: boolean; }) => {
 
  return (
    <div className={style.item}>
      <p className={style.title}>{title}</p>
      <label className={style.label}>
        <input
          {...register}
          className={
            style.input + " " + (register.error ? style.error : style.correct)
          }
          // "^этот колхоз я перепишу^
        />
      </label>
    </div>
  );
}

export default RegistrationItem