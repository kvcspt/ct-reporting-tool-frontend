export class Utils {
  public static camelToTitleCase(str: string): string {
    const result = str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (match) => match.toUpperCase());

    return result.trim();
  }

  public static toCamelCase(str: string): string {
    return str
      .replace(/(?:[_\s-])(\w)/g, (_, char) => char.toUpperCase())
      .replace(/^(.)/, (match) => match.toLowerCase());
  }
}
