interface DarwinDecodedType {
  email: string;
  timestamp: number;
  hash: string;
  Uid: string;
  employee_no: string;
  company_name: string;
  firstname: string;
  lastname: string;
  office_location_city: string;
  office_location_pincode: string;
  token: string;
}

export function decoderDarwin(encoded_payload: string): DarwinDecodedType {
  const deciphXOR = require("base64-xor");
  const code_cyp = `U098WlRhcEZUdX8Af1h8XmxbcFpUdQMGbGFCBm9hA0BncUJBVF8HXFQFfEF6W3hAVGV%2FRX9YZEZUYWBMUnFwQlV1fwB7YlVMe3JnT3hccwN7T0FfV3FwTFd1fwB%2FW3sCeGFjTGxbYF5sYlVPe1x4Wm9iYwZ4cnsFbFxdA3hye054cmxdewRgWnhicF57cX8EbHFgW2xcZwd4THMGe2JRQW9hb094cl1Be3JVT29cb0F4THdOb1xvTnlyewVvYm8He3J%2FBGxcfFx5cnhbb0x3B3tiUQZ5YXMHeExwWmxxewRscmRdeXJnTGxyUUFsW2Bbe0x0W3tieF5sYX8He3FsXntMVUFsW2Rdf19BX2BhWl1%2FXFlfe2J%2FTH9fQV9sYQdBVHEPA2xhYFBUWw5feV9%2FQXtic097XHNOe3J3TntPf0V%2FW3hAVG50XlRYWlBUW3BCbGV%2FAH9dQmdiX3RyVAV8QVQFfF5ScVpAVF9%2FRX9bbEZVWHgGVFtwQmxlfwB%2FWnxebFtwWlR1dGNsYUIGb2EDQH9zUk9vYQNdV2FwBW9hAlFkYUJDb2EDXW9lf0V%2FW05eVQVkQ29hB1p%2FXFlff19BX1QEbFtXYXhabgQHQG9bWkVsZX8Af19%2FRX9bD1tsW1pcbGAPRVQEeF5ScVpAVFoPXFduZAN%2FXFlfZVtwRG9ufAZvZX9Ff1sPW2xbWlxsYA9FVAR4XlJxWkBUWg9BV2EDXFQEZFp%2FXFlfe2J%2FA3hid196dXwGVARCWlRffwB%2FXG8GeGJ3BntyVQNsYXsEbGFjB3hxbwd5cnxcb2F%2FBXtcUU57YmxabHFnBH9YBgs%3D`;
  const decodedURI = decodeURIComponent(code_cyp);
  const decodedbase64_1 = Buffer.from(decodedURI, "base64");
  const keyXOR = "666666";

  const decoded = deciphXOR.decode(keyXOR, decodedbase64_1);
  const decodedbase64_2 = Buffer.from(decoded, "base64").toString("utf8");
  return JSON.parse(decodedbase64_2);
}
