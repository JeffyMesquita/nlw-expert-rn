import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

export type InputProps = TextInputProps & {};

export function Input({ ...rest }: InputProps) {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      placeholderTextColor={colors.neutral[400]}
      className="h-32 bg-neutral-800 rounded-md px-4 py-3 text-sm text-neutral-100"
      {...rest}
    />
  );
}
