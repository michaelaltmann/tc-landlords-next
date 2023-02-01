/* eslint-disable */
import type { Prisma, Parcel } from "@prisma/client";
import { useContext } from 'react';
import { RequestHandlerContext, type RequestOptions } from '@zenstackhq/react/runtime';
import * as request from '@zenstackhq/react/runtime';

export function useParcel() {
    const { endpoint } = useContext(RequestHandlerContext);
    const prefixesToMutate = [`${endpoint}/parcel/find`, `${endpoint}/parcel/aggregate`, `${endpoint}/parcel/count`, `${endpoint}/parcel/groupBy`];
    const mutate = request.getMutate(prefixesToMutate);

    async function create<T extends Prisma.ParcelCreateArgs>(args: Prisma.SelectSubset<T, Prisma.ParcelCreateArgs>) {
        try {
            return await request.post<Prisma.SelectSubset<T, Prisma.ParcelCreateArgs>, Prisma.CheckSelect<T, Parcel, Prisma.ParcelGetPayload<T>>>(`${endpoint}/parcel/create`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    function findMany<T extends Prisma.ParcelFindManyArgs>(args?: Prisma.SelectSubset<T, Prisma.ParcelFindManyArgs>, options?: RequestOptions<Array<Prisma.ParcelGetPayload<T>>>) {
        return request.get<Array<Prisma.ParcelGetPayload<T>>>(`${endpoint}/parcel/findMany`, args, options);
    }

    function findUnique<T extends Prisma.ParcelFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.ParcelFindUniqueArgs>, options?: RequestOptions<Prisma.ParcelGetPayload<T>>) {
        return request.get<Prisma.ParcelGetPayload<T>>(`${endpoint}/parcel/findUnique`, args, options);
    }

    function findFirst<T extends Prisma.ParcelFindFirstArgs>(args: Prisma.SelectSubset<T, Prisma.ParcelFindFirstArgs>, options?: RequestOptions<Prisma.ParcelGetPayload<T>>) {
        return request.get<Prisma.ParcelGetPayload<T>>(`${endpoint}/parcel/findFirst`, args, options);
    }

    async function update<T extends Prisma.ParcelUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.ParcelUpdateArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.ParcelUpdateArgs>, Prisma.ParcelGetPayload<T>>(`${endpoint}/parcel/update`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function updateMany<T extends Prisma.ParcelUpdateManyArgs>(args: Prisma.SelectSubset<T, Prisma.ParcelUpdateManyArgs>) {
        return await request.put<Prisma.SelectSubset<T, Prisma.ParcelUpdateManyArgs>, Prisma.BatchPayload>(`${endpoint}/parcel/updateMany`, args, mutate);
    }

    async function upsert<T extends Prisma.ParcelUpsertArgs>(args: Prisma.SelectSubset<T, Prisma.ParcelUpsertArgs>) {
        try {
            return await request.put<Prisma.SelectSubset<T, Prisma.ParcelUpsertArgs>, Prisma.ParcelGetPayload<T>>(`${endpoint}/parcel/upsert`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function del<T extends Prisma.ParcelDeleteArgs>(args?: Prisma.SelectSubset<T, Prisma.ParcelDeleteArgs>) {
        try {
            return await request.del<Prisma.ParcelGetPayload<T>>(`${endpoint}/parcel/delete`, args, mutate);
        } catch (err: any) {
            if (err.prisma && err.code === 'P2004') {
                // unable to readback data
                return undefined;
            } else {
                throw err;
            }
        }
    }

    async function deleteMany<T extends Prisma.ParcelDeleteManyArgs>(args?: Prisma.SelectSubset<T, Prisma.ParcelDeleteManyArgs>) {
        return await request.del<Prisma.BatchPayload>(`${endpoint}/parcel/deleteMany`, args, mutate);
    }

    function aggregate<T extends Prisma.ParcelAggregateArgs>(args: Prisma.Subset<T, Prisma.ParcelAggregateArgs>, options?: RequestOptions<Prisma.GetParcelAggregateType<T>>) {
        return request.get<Prisma.GetParcelAggregateType<T>>(`${endpoint}/parcel/aggregate`, args, options);
    }

    function groupBy<T extends Prisma.ParcelGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? { orderBy: Prisma.UserGroupByArgs['orderBy'] } : { orderBy?: Prisma.UserGroupByArgs['orderBy'] }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.TupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True
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
        }[OrderFields]>(args: Prisma.SubsetIntersection<T, Prisma.ParcelGroupByArgs, OrderByArg> & InputErrors, options?: RequestOptions<{} extends InputErrors ? Prisma.GetParcelGroupByPayload<T> : InputErrors>) {
        return request.get<{} extends InputErrors ? Prisma.GetParcelGroupByPayload<T> : InputErrors>(`${endpoint}/parcel/groupBy`, args, options);
    }
    return { create, findMany, findUnique, findFirst, update, updateMany, upsert, del, deleteMany, aggregate, groupBy };
}
