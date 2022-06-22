import Event from '@/domains/event/models/event'
import defaultsDeep from 'lodash/defaultsDeep'
import moment from 'moment'

const search = async (where: any) => {
  defaultsDeep(where, {
    between: {
      from: moment.utc().format('YYYY-MM-DD'),
      to: moment.utc().add(1, 'month').format('YYYY-MM-DD'),
    },
    pagination: {
      skip: 0,
      limit: 10,
    },
  })

  const query: any = {
    startsAt: { $gte: moment.utc(where.between.from).toDate() },
    endsAt: { $lte: moment.utc(where.between.to).toDate() },
  }

  if (where.category) query.category = where.category
  if (where.free) query.free = where.free === '1'
  if (where.city) query['address.city'] = where.city
  if (where.textSearch)
    query.$and = [
      {
        $or: [
          { name: { $regex: new RegExp(where.textSearch, 'ig') } },
          { organizatorName: { $regex: new RegExp(where.textSearch, 'ig') } },
        ],
      },
    ]

  const pipeline = [
    { $match: query },
    { $sort: { startsAt: 1 as 1 } },
    { $skip: where.pagination.skip },
    { $limit: where.pagination.limit },
  ]

  const events = await Event.aggregate(pipeline)
  const totalEventCount = await Event.countDocuments(query)
  const currentPage = where.pagination.skip / where.pagination.limit + 1
  const totalPageCount = Math.ceil(totalEventCount / where.pagination.limit)

  return {
    count: events.length,
    total: totalEventCount,
    page: currentPage,
    totalPageCount,
    list: events,
  }
}

const SearchManager = {
  search,
}

export default SearchManager
