import styles from './Modal.module.scss';

export const Modal = ({ open, setOpen, children }) => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <svg
            onClick={() => setOpen(!open)}
            height="200"
            viewBox="0 0 200 200"
            width="200"
          >
            <title />
            <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
          </svg>
          {children}
        </div>
      </div>
    </>
  );
};
