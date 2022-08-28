export const fetchUser = async (userName: string) => {
  try {
    let response = await fetch(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
    );
    const json = await response.json();
    // setExchRate([json[0], json[1]]);
  } catch (err: any) {
    err.message = "Can not get user, try latter";
    throw err;
  }
};
