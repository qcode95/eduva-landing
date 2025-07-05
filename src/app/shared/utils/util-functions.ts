import { FormGroup } from '@angular/forms';

/**
 * Checks whether the value and confirm value fields in a FormGroup do not match.
 *
 * @param form - The FormGroup containing the fields that need to check matching.
 * @param valueField - The name of the value field (default: 'newPassword').
 * @param confirmValueField - The name of the confirm value field (default: 'confirmPassword').
 * @returns `true` if the values do not match, otherwise `false`.
 */
export function isFormFieldMismatch(
  form: FormGroup,
  valueField: string = 'newPassword',
  confirmValueField: string = 'confirmPassword'
): boolean {
  const value: string | null | undefined = form.get(valueField)?.value;
  const confirmValue: string | null | undefined =
    form.get(confirmValueField)?.value;
  return value !== confirmValue;
}
