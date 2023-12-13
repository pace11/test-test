export const toMappingDataUser = (data) => ({
  age: data?.user?.age?.value ?? "",
});

data = {
  user: {
    age: {
      value: 10,
    },
  },
};
