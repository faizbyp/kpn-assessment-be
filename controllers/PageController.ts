import { getPage } from "#dep/models/PageModel";
import { Request, Response } from "express";

export const handleGetPage = async (_req: Request, res: Response) => {
  try {
    const result = await getPage();
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
