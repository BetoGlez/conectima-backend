import { Arg, Query, Resolver } from "type-graphql";
import { Service } from "typedi";

import { SprintsService } from "../../../services/sprints.service";
import { getSheetDocument } from "../../../utils/google-sheets";
import { Sprint } from "../../entities/Sprint";

@Service()
@Resolver()
export class SprintQueryResolver {

    public constructor(private sprintsSrv: SprintsService) {}

    @Query(() => [Sprint])
    public async getSprints(@Arg("sheetId") sheetId: string): Promise<Array<Sprint>> {
        const doc = await getSheetDocument(sheetId);
        const sprintsPromises = new Array<Promise<Sprint>>();
        for (let i = 0; i < doc.sheetCount; i++) {
            const sheet = doc.sheetsByIndex[i];
            sprintsPromises.push(this.sprintsSrv.composeSprint(sheet));
        }
        const sprints = await Promise.all(sprintsPromises);
        return sprints;
    }
}