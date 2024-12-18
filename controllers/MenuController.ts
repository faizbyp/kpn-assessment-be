import { getAdminMenu, getAllMenu } from "#dep/models/MenuModel";
import { Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

export const handleGetAdminMenu = async (req: Request, res: Response) => {
  const roleId = req.userDecode?.role_id;

  try {
    if (!roleId) throw new Error("Role ID not provided");
    const result = await getAdminMenu(roleId);
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

    // ADD DASHBOARD
    formattedResult.unshift({
      items: [{ name: "Dashboard", path: "/admin", icon: "Home" }],
    });

    res.status(200).send({
      message: `Success get menu`,
      data: formattedResult,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleGetAllMenu = async (req: Request, res: Response) => {
  try {
    const result = await getAllMenu();

    res.status(200).send({
      message: `Success get all menu`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
