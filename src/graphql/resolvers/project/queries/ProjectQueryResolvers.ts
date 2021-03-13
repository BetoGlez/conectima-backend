import { Query, Resolver } from "type-graphql";

@Resolver()
export class ProjectQueryResolvers {
    @Query()
    public async getSprints() {
        // TODO: Pending implementation
    }
}