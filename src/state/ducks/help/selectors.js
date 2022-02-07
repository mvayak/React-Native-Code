const showIntro = state => {
  const {isSkippedIntro, isDoneIntro} = state.help;

  return !(isSkippedIntro || isDoneIntro);
};

export default {
  showIntro,
};
