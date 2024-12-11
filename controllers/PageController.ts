import { getPage } from "#dep/models/PageModel";
import { Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

export const handleGetPage = async (req: Request, res: Response) => {
  const authHeaders =
    (req.headers.Authorization as string) || (req.headers.authorization as string);
  let token = "";
  if (authHeaders) token = authHeaders.split(" ")[1];
  if (!authHeaders) {
    res.status(403).send({
      message: "Access Denied",
    });
  }

  try {
    const decoded: any = verify(token, process.env.SECRETJWT as Secret);
    const roleId = decoded.role_id;
    console.log(decoded);
    console.log("id", roleId);

    const result = await getPage(roleId);
    const groupedData = result.reduce((acc, item) => {
      const key = item.subheader || "Others"; // Use "Others" for null subheaders
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push({
        name: item.name,
        path: item.path,
        icon: item.icon,
        is_active: item.is_active,
        position: item.position,
        fcreate: item.fcreate,
        fread: item.fread,
        fupdate: item.fupdate,
        fdelete: item.fdelete,
      });
      return acc;
    }, {});

    const sortedEntries = Object.entries(groupedData).sort(([aKey], [bKey]) => {
      if (aKey === "Others") return -1;
      if (bKey === "Others") return 1;
      return 0;
    });

    const formattedResult = sortedEntries.map(([subheader, items]) => {
      const group: { items: unknown; subheader?: string } = { items };
      if (subheader !== "Others") {
        group.subheader = subheader;
      }
      return group;
    });

    res.status(200).send({
      message: `Success get pages`,
      data: formattedResult,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
