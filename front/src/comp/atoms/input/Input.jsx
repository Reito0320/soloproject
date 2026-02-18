import { motion } from 'motion/react';

export const Input = ({
  className,
  inputTitle,
  onChangeFunc,
  placeHolder,
  inputType,
}) => {
  return (
    <label>
      {inputTitle}
      <motion.input
        whileTap={{ y: -5 }}
        onChange={onChangeFunc}
        placeholder={placeHolder}
        type={inputType}
        className={className}
      />
    </label>
  );
};
