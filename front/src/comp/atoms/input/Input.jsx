import { motion } from 'motion/react';

export const Input = ({
  className,
  inputTitle,
  onChangeFunc,
  onFucus,
  placeHolder,
  inputType,
  inputName,
}) => {
  return (
    <label>
      {inputTitle}
      <motion.input
        whileTap={{ y: -5 }}
        onChange={onChangeFunc}
        placeholder={placeHolder}
        onFocus={onFucus}
        type={inputType}
        name={inputName}
        className={className}
        style={{ marginLeft: 10 }}
      />
    </label>
  );
};
