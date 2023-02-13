/* eslint-disable */
import type { Prisma, Keyword } from "@prisma/client";
import { useContext } from 'react';
import { RequestHandlerContext, type RequestOptions } from '@zenstackhq/react/runtime';
import * as request from '@zenstackhq/react/runtime';

export function useKeyword() {
    const { endpoint } = useContext(RequestHandlerContext);
    const prefixesToMutate = [`${endpoint}/keyword/find`, `${endpoint}/keyword/aggregate`, `${endpoint}/keyword/count`, `${endpoint}/keyword/groupBy`];
    const mutate = request.getMutate(prefixesToMutate);

    async function create<T extends Prisma.KeywordCreateArgs>(args: Prisma.SelectSubset<T, Prisma.KeywordCreateArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.KeywordCreateArgs>, Prisma.CheckSelect<T, Keyword, Prisma.KeywordGetPayload<T>>>(`${endpoint}/keyword/create`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function createMany<T extends Prisma.KeywordCreateManyArgs>(args: Prisma.SelectSubset<T, Prisma.KeywordCreateManyArgs>) {
        return await request.post<Prisma.SelectSubset<T, Prisma.KeywordCreateManyArgs>, Prisma.BatchPayload>(`${endpoint}/keyword/createMany`, args, mutate);
    }

    function findMany<T extends Prisma.KeywordFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.KeywordFindManyArgs>, options?: RequestOptions<Array<Prisma.KeywordGetPayload<T>>>) {
        return request.get<Array<Prisma.KeywordGetPayload<T>>>(`${endpoint}/keyword/findMany`, args, options);
    }

    function findUnique<T extends Prisma.KeywordFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.KeywordFindUniqueArgs>, options?: RequestOptions<Prisma.KeywordGetPayload<T>>) {
        return request.get<Prisma.KeywordGetPayload<T>>(`${endpoint}/keyword/findUnique`, args, options);
    }

    function findFirst<T extends Prisma.KeywordFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.KeywordFindFirstArgs>, options?: RequestOptions<Prisma.KeywordGetPayload<T>>) {
        return request.get<Prisma.KeywordGetPayload<T>>(`${endpoint}/keyword/findFirst`, args, options);
    }

    async function update<T extends Prisma.KeywordUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.KeywordUpdateArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.KeywordUpdateArgs>, Prisma.KeywordGetPayload<T>>(`${endpoint}/keyword/update`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function updateMany<T extends Prisma.KeywordUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.KeywordUpdateManyArgs>) {
        return await request.put<Prisma.SelectSubset<T, Prisma.KeywordUpdateManyArgs>, Prisma.BatchPayload>(`${endpoint}/keyword/updateMany`, args, mutate);
    }

    async function upsert<T extends Prisma.KeywordUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.KeywordUpsertArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.KeywordUpsertArgs>, Prisma.KeywordGetPayload<T>>(`${endpoint}/keyword/upsert`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function del<T extends Prisma.KeywordDeleteArgs>(args?: Prisma.SelectSubset<T, Prisma.KeywordDeleteArgs>) {
        try {
            return await request.del<Prisma.KeywordGetPayload<T>>(`${endpoint}/keyword/delete`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function deleteMany<T extends Prisma.KeywordDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.KeywordDeleteManyArgs>) {
        return await request.del<Prisma.BatchPayload>(`${endpoint}/keyword/deleteMany`, args, mutate);
    }

    function aggregate<T extends Prisma.KeywordAggregateArgs>(args: Prisma.Subset<T, Prisma.KeywordAggregateArgs>, options?: RequestOptions<Prisma.GetKeywordAggregateType<T>>) {
        return request.get<Prisma.GetKeywordAggregateType<T>>(`${endpoint}/keyword/aggregate`, args, options);
    }

    function groupBy<T extends Prisma.KeywordGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.UserGroupByArgs['orderBy'] } : { orderBy?: Prisma.UserGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.TupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
        ? `Error: "by" must not be empty.`
        : HavingValid extends Prisma.False
        ? {
            [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
            ]
        }[HavingFields]
        : 'take' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
        ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
        : 'skip' extends Prisma.Keys<T>
        ? 'orderBy' extends Prisma.Keys<T>
        ? ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends Prisma.True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]>(args: Prisma.SubsetIntersection<T, Prisma.KeywordGroupByArgs, OrderByArg> & InputErrors, options?: RequestOptions<{} extends InputErrors ? Prisma.GetKeywordGroupByPayload<T> : InputErrors>) {
        return request.get<{} extends InputErrors ? Prisma.GetKeywordGroupByPayload<T> : InputErrors>(`${endpoint}/keyword/groupBy`, args, options);
    }
    return { create, createMany, findMany, findUnique, findFirst, update, updateMany, upsert, del, deleteMany, aggregate, groupBy };
}
