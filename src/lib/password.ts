import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    throw new Error("Failed to hash password");
  }
};

export const comparePassword = async (
  plainPassword: string,
  hash: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hash);
    return isMatch;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    throw new Error("Failed to compare password");
  }
};
