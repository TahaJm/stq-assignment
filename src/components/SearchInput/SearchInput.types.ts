export interface SearchInputProps {
  label: string;
  placeholder: string;
  onChange: (query: string) => void;
  value: string;
}