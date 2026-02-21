import { motion } from 'motion/react';

export const Input = ({
  className,
  inputTitle,
  onChangeFunc,
  onKeydownFunc,
  placeHolder,
  inputType,
}) => {
  return (
    <label>
      {inputTitle}
      <motion.input
        whileTap={{ y: -5 }}
        onChange={onChangeFunc}
        onKeyDown={onKeydownFunc}
        placeholder={placeHolder}
        type={inputType}
        className={className}
        style={{ marginLeft: 10 }}
      />
    </label>
  );
};
