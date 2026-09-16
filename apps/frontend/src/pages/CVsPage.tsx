import { Link } from 'react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { SiteHeader } from '@/components/SiteHeader'
import { projectsService } from '@/lib/projectsService'
import { FileText, Loader2, Search } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

export function CVsPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => setDebouncedSearch(value), 350)
  }, [])

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
    }
  }, [])

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['projects', debouncedSearch],
    queryFn: ({ pageParam = 0 }) =>
      projectsService.getProjects({
        limit: 12,
        offset: pageParam,
        order: 'desc',
        qTitle: debouncedSearch || undefined,
      }),
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage.result
      return pagination.hasMore ? pagination.offset + pagination.limit : undefined
    },
    initialPageParam: 0,
  })

  const projects = data?.pages.flatMap((page) => page.result.projects) ?? []

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Published CVs</h1>
            <p className="text-sm text-muted-foreground mt-1">
              All CVs published through CV Maker.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-md bg-input border border-border pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            {error instanceof Error ? error.message : 'Failed to load projects'}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading...
          </div>
        )}

        {projects.length === 0 && !isLoading && !error && (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">No published CVs yet.</p>
            <Link
              to="/editor"
              className="inline-flex mt-4 items-center gap-1.5 rounded-md bg-[image:var(--gradient-primary)] text-primary-foreground text-sm font-medium px-4 py-2"
            >
              Create the first one
            </Link>
          </div>
        )}

        {projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                to={`/cv/${p.id}`}
                className="group rounded-xl border border-border bg-card p-4 hover:border-primary/60 transition flex items-start gap-3"
              >
                <div className="h-10 w-10 shrink-0 rounded-lg bg-[image:var(--gradient-primary)] flex items-center justify-center text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate group-hover:text-primary transition">
                    {p.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(p.createdAt).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load more indicator */}
        {isFetchingNextPage && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-6">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading more...
          </div>
        )}

        {/* Manual load more button */}
        {hasNextPage && !isFetchingNextPage && (
          <div className="text-center mt-6">
            <button
              onClick={() => fetchNextPage()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
