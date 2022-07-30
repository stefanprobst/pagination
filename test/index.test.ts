import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { range } from '@stefanprobst/range'

import { createPagination, PaginationItem } from '../src'

function pad(page: number): string {
  return String(page).padStart(2, '0')
}

function pretty(pagination: Array<PaginationItem>, currentPage: number): string {
  return pagination
    .map((item) => {
      if (item.type === 'ellipsis') return ' .. '
      if (item.page === currentPage) return `[${pad(item.page)}]`
      return ` ${pad(item.page)} `
    })
    .join('-')
}

/** Minimum length is `1 + (neighbors * 2) + (edges * 2) + 2`, which defaults to 11. */
test('Create pagination sequence when pages less than minimum length', () => {
  const pages = 11

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages }), page)
  })

  assert.equal(results, [
    '[01]- 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09 - 10 - 11 ',
    ' 01 -[02]- 03 - 04 - 05 - 06 - 07 - 08 - 09 - 10 - 11 ',
    ' 01 - 02 -[03]- 04 - 05 - 06 - 07 - 08 - 09 - 10 - 11 ',
    ' 01 - 02 - 03 -[04]- 05 - 06 - 07 - 08 - 09 - 10 - 11 ',
    ' 01 - 02 - 03 - 04 -[05]- 06 - 07 - 08 - 09 - 10 - 11 ',
    ' 01 - 02 - 03 - 04 - 05 -[06]- 07 - 08 - 09 - 10 - 11 ',
    ' 01 - 02 - 03 - 04 - 05 - 06 -[07]- 08 - 09 - 10 - 11 ',
    ' 01 - 02 - 03 - 04 - 05 - 06 - 07 -[08]- 09 - 10 - 11 ',
    ' 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 -[09]- 10 - 11 ',
    ' 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09 -[10]- 11 ',
    ' 01 - 02 - 03 - 04 - 05 - 06 - 07 - 08 - 09 - 10 -[11]',
  ])
})

test('Create pagination sequence with ellipsis (event page count)', () => {
  const pages = 12

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages }), page)
  })

  assert.equal(results, [
    '[01]- 02 - 03 - 04 - 05 - 06 - 07 - 08 - .. - 11 - 12 ',
    ' 01 -[02]- 03 - 04 - 05 - 06 - 07 - 08 - .. - 11 - 12 ',
    ' 01 - 02 -[03]- 04 - 05 - 06 - 07 - 08 - .. - 11 - 12 ',
    ' 01 - 02 - 03 -[04]- 05 - 06 - 07 - 08 - .. - 11 - 12 ',
    ' 01 - 02 - 03 - 04 -[05]- 06 - 07 - 08 - .. - 11 - 12 ',
    ' 01 - 02 - 03 - 04 - 05 -[06]- 07 - 08 - .. - 11 - 12 ',
    ' 01 - 02 - .. - 05 - 06 -[07]- 08 - 09 - 10 - 11 - 12 ',
    ' 01 - 02 - .. - 05 - 06 - 07 -[08]- 09 - 10 - 11 - 12 ',
    ' 01 - 02 - .. - 05 - 06 - 07 - 08 -[09]- 10 - 11 - 12 ',
    ' 01 - 02 - .. - 05 - 06 - 07 - 08 - 09 -[10]- 11 - 12 ',
    ' 01 - 02 - .. - 05 - 06 - 07 - 08 - 09 - 10 -[11]- 12 ',
    ' 01 - 02 - .. - 05 - 06 - 07 - 08 - 09 - 10 - 11 -[12]',
  ])
})

test('Create pagination sequence with ellipsis (odd page count)', () => {
  const pages = 13

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages }), page)
  })

  assert.equal(results, [
    '[01]- 02 - 03 - 04 - 05 - 06 - 07 - 08 - .. - 12 - 13 ',
    ' 01 -[02]- 03 - 04 - 05 - 06 - 07 - 08 - .. - 12 - 13 ',
    ' 01 - 02 -[03]- 04 - 05 - 06 - 07 - 08 - .. - 12 - 13 ',
    ' 01 - 02 - 03 -[04]- 05 - 06 - 07 - 08 - .. - 12 - 13 ',
    ' 01 - 02 - 03 - 04 -[05]- 06 - 07 - 08 - .. - 12 - 13 ',
    ' 01 - 02 - 03 - 04 - 05 -[06]- 07 - 08 - .. - 12 - 13 ',
    ' 01 - 02 - .. - 05 - 06 -[07]- 08 - 09 - .. - 12 - 13 ',
    ' 01 - 02 - .. - 06 - 07 -[08]- 09 - 10 - 11 - 12 - 13 ',
    ' 01 - 02 - .. - 06 - 07 - 08 -[09]- 10 - 11 - 12 - 13 ',
    ' 01 - 02 - .. - 06 - 07 - 08 - 09 -[10]- 11 - 12 - 13 ',
    ' 01 - 02 - .. - 06 - 07 - 08 - 09 - 10 -[11]- 12 - 13 ',
    ' 01 - 02 - .. - 06 - 07 - 08 - 09 - 10 - 11 -[12]- 13 ',
    ' 01 - 02 - .. - 06 - 07 - 08 - 09 - 10 - 11 - 12 -[13]',
  ])
})

test('Create pagination sequence with ellipsis (many pages)', () => {
  const pages = 25

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages }), page)
  })

  assert.equal(results, [
    '[01]- 02 - 03 - 04 - 05 - 06 - 07 - 08 - .. - 24 - 25 ',
    ' 01 -[02]- 03 - 04 - 05 - 06 - 07 - 08 - .. - 24 - 25 ',
    ' 01 - 02 -[03]- 04 - 05 - 06 - 07 - 08 - .. - 24 - 25 ',
    ' 01 - 02 - 03 -[04]- 05 - 06 - 07 - 08 - .. - 24 - 25 ',
    ' 01 - 02 - 03 - 04 -[05]- 06 - 07 - 08 - .. - 24 - 25 ',
    ' 01 - 02 - 03 - 04 - 05 -[06]- 07 - 08 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 05 - 06 -[07]- 08 - 09 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 06 - 07 -[08]- 09 - 10 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 07 - 08 -[09]- 10 - 11 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 08 - 09 -[10]- 11 - 12 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 09 - 10 -[11]- 12 - 13 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 10 - 11 -[12]- 13 - 14 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 11 - 12 -[13]- 14 - 15 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 12 - 13 -[14]- 15 - 16 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 13 - 14 -[15]- 16 - 17 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 14 - 15 -[16]- 17 - 18 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 15 - 16 -[17]- 18 - 19 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 16 - 17 -[18]- 19 - 20 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 17 - 18 -[19]- 20 - 21 - .. - 24 - 25 ',
    ' 01 - 02 - .. - 18 - 19 -[20]- 21 - 22 - 23 - 24 - 25 ',
    ' 01 - 02 - .. - 18 - 19 - 20 -[21]- 22 - 23 - 24 - 25 ',
    ' 01 - 02 - .. - 18 - 19 - 20 - 21 -[22]- 23 - 24 - 25 ',
    ' 01 - 02 - .. - 18 - 19 - 20 - 21 - 22 -[23]- 24 - 25 ',
    ' 01 - 02 - .. - 18 - 19 - 20 - 21 - 22 - 23 -[24]- 25 ',
    ' 01 - 02 - .. - 18 - 19 - 20 - 21 - 22 - 23 - 24 -[25]',
  ])
})

test('Create pagination sequence with custom edge count', () => {
  const pages = 11

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages, edges: 1 }), page)
  })

  assert.equal(results, [
    '[01]- 02 - 03 - 04 - 05 - 06 - 07 - .. - 11 ',
    ' 01 -[02]- 03 - 04 - 05 - 06 - 07 - .. - 11 ',
    ' 01 - 02 -[03]- 04 - 05 - 06 - 07 - .. - 11 ',
    ' 01 - 02 - 03 -[04]- 05 - 06 - 07 - .. - 11 ',
    ' 01 - 02 - 03 - 04 -[05]- 06 - 07 - .. - 11 ',
    ' 01 - .. - 04 - 05 -[06]- 07 - 08 - .. - 11 ',
    ' 01 - .. - 05 - 06 -[07]- 08 - 09 - 10 - 11 ',
    ' 01 - .. - 05 - 06 - 07 -[08]- 09 - 10 - 11 ',
    ' 01 - .. - 05 - 06 - 07 - 08 -[09]- 10 - 11 ',
    ' 01 - .. - 05 - 06 - 07 - 08 - 09 -[10]- 11 ',
    ' 01 - .. - 05 - 06 - 07 - 08 - 09 - 10 -[11]',
  ])
})

test('Create pagination sequence with no edges', () => {
  const pages = 11

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages, edges: 0 }), page)
  })

  assert.equal(results, [
    '[01]- 02 - 03 - 04 - 05 - 06 - .. ',
    ' 01 -[02]- 03 - 04 - 05 - 06 - .. ',
    ' 01 - 02 -[03]- 04 - 05 - 06 - .. ',
    ' 01 - 02 - 03 -[04]- 05 - 06 - .. ',
    ' .. - 03 - 04 -[05]- 06 - 07 - .. ',
    ' .. - 04 - 05 -[06]- 07 - 08 - .. ',
    ' .. - 05 - 06 -[07]- 08 - 09 - .. ',
    ' .. - 06 - 07 -[08]- 09 - 10 - 11 ',
    ' .. - 06 - 07 - 08 -[09]- 10 - 11 ',
    ' .. - 06 - 07 - 08 - 09 -[10]- 11 ',
    ' .. - 06 - 07 - 08 - 09 - 10 -[11]',
  ])
})

test('Create pagination sequence with custom neighbor count', () => {
  const pages = 11

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages, neighbors: 1 }), page)
  })

  assert.equal(results, [
    '[01]- 02 - 03 - 04 - 05 - 06 - .. - 10 - 11 ',
    ' 01 -[02]- 03 - 04 - 05 - 06 - .. - 10 - 11 ',
    ' 01 - 02 -[03]- 04 - 05 - 06 - .. - 10 - 11 ',
    ' 01 - 02 - 03 -[04]- 05 - 06 - .. - 10 - 11 ',
    ' 01 - 02 - 03 - 04 -[05]- 06 - .. - 10 - 11 ',
    ' 01 - 02 - .. - 05 -[06]- 07 - .. - 10 - 11 ',
    ' 01 - 02 - .. - 06 -[07]- 08 - 09 - 10 - 11 ',
    ' 01 - 02 - .. - 06 - 07 -[08]- 09 - 10 - 11 ',
    ' 01 - 02 - .. - 06 - 07 - 08 -[09]- 10 - 11 ',
    ' 01 - 02 - .. - 06 - 07 - 08 - 09 -[10]- 11 ',
    ' 01 - 02 - .. - 06 - 07 - 08 - 09 - 10 -[11]',
  ])
})

test('Create pagination sequence with no neighbors', () => {
  const pages = 11

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages, neighbors: 0 }), page)
  })

  assert.equal(results, [
    '[01]- 02 - 03 - 04 - .. - 10 - 11 ',
    ' 01 -[02]- 03 - 04 - .. - 10 - 11 ',
    ' 01 - 02 -[03]- 04 - .. - 10 - 11 ',
    ' 01 - 02 - 03 -[04]- .. - 10 - 11 ',
    ' 01 - 02 - .. -[05]- .. - 10 - 11 ',
    ' 01 - 02 - .. -[06]- .. - 10 - 11 ',
    ' 01 - 02 - .. -[07]- .. - 10 - 11 ',
    ' 01 - 02 - .. -[08]- 09 - 10 - 11 ',
    ' 01 - 02 - .. - 08 -[09]- 10 - 11 ',
    ' 01 - 02 - .. - 08 - 09 -[10]- 11 ',
    ' 01 - 02 - .. - 08 - 09 - 10 -[11]',
  ])
})

test('Create pagination sequence with no edges and no neighbors', () => {
  const pages = 11

  const results = range(1, pages).map((page) => {
    return pretty(createPagination({ page, pages, edges: 0, neighbors: 0 }), page)
  })

  assert.equal(results, [
    '[01]- 02 - .. ',
    ' 01 -[02]- .. ',
    ' .. -[03]- .. ',
    ' .. -[04]- .. ',
    ' .. -[05]- .. ',
    ' .. -[06]- .. ',
    ' .. -[07]- .. ',
    ' .. -[08]- .. ',
    ' .. -[09]- .. ',
    ' .. -[10]- 11 ',
    ' .. - 10 -[11]',
  ])
})

test.run()
