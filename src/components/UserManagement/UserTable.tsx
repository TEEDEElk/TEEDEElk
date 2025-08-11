import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, PaginationParams, FilterParams } from '../../types';
import { UserService, UserSearchOptions } from '../../services/UserService';

/**
 * Props for the UserTable component
 * @interface UserTableProps
 * @since 1.0.0
 */
export interface UserTableProps {
  /** User service instance for API operations */
  userService: UserService;
  /** Initial pagination settings */
  initialPagination?: PaginationParams;
  /** Initial filter settings */
  initialFilters?: FilterParams;
  /** Whether to show the search bar */
  showSearch?: boolean;
  /** Whether to show bulk action controls */
  showBulkActions?: boolean;
  /** Whether to show user statistics */
  showStats?: boolean;
  /** Custom CSS class name */
  className?: string;
  /** Callback when a user is selected */
  onUserSelect?: (user: User) => void;
  /** Callback when users are updated */
  onUsersUpdate?: (users: User[]) => void;
  /** Callback when an error occurs */
  onError?: (error: string) => void;
  /** Custom render function for user actions */
  renderUserActions?: (user: User) => React.ReactNode;
  /** Custom render function for user status */
  renderUserStatus?: (user: User) => React.ReactNode;
}

/**
 * Internal state for the UserTable component
 * @interface UserTableState
 * @since 1.0.0
 */
interface UserTableState {
  /** List of users to display */
  users: User[];
  /** Current pagination settings */
  pagination: Required<PaginationParams>;
  /** Current filter settings */
  filters: FilterParams;
  /** Whether data is currently loading */
  loading: boolean;
  /** Current error message */
  error: string | null;
  /** Selected user IDs for bulk operations */
  selectedUserIds: string[];
  /** Search query string */
  searchQuery: string;
  /** User statistics */
  stats: {
    total: number;
    active: number;
    inactive: number;
    suspended: number;
    newThisMonth?: number;
    newThisYear?: number;
    growthRate?: number;
  } | null;
}

/**
 * UserTable component for displaying and managing users
 * 
 * This component provides a comprehensive interface for viewing, searching, filtering,
 * and managing users. It includes built-in pagination, search functionality, bulk
 * operations, and real-time updates.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <UserTable userService={userService} />
 * 
 * // Advanced usage with custom configuration
 * <UserTable
 *   userService={userService}
 *   initialPagination={{ page: 1, limit: 50 }}
 *   initialFilters={{ status: 'active' }}
 *   showSearch={true}
 *   showBulkActions={true}
 *   showStats={true}
 *   onUserSelect={(user) => console.log('Selected:', user)}
 *   onUsersUpdate={(users) => console.log('Updated:', users)}
 *   renderUserActions={(user) => (
 *     <button onClick={() => editUser(user)}>Edit</button>
 *   )}
 * />
 * ```
 * 
 * @component UserTable
 * @since 1.0.0
 */
export const UserTable: React.FC<UserTableProps> = ({
  userService,
  initialPagination = { page: 1, limit: 20, sortBy: 'createdAt', sortOrder: 'desc' },
  initialFilters = {},
  showSearch = true,
  showBulkActions = true,
  showStats = true,
  className = '',
  onUserSelect,
  onUsersUpdate,
  onError,
  renderUserActions,
  renderUserStatus
}) => {
  // Component state
  const [state, setState] = useState<UserTableState>({
    users: [],
    pagination: {
      page: 1,
      limit: 20,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      ...initialPagination
    } as Required<PaginationParams>,
    filters: initialFilters,
    loading: false,
    error: null,
    selectedUserIds: [],
    searchQuery: '',
    stats: null
  });

  // Memoized computed values
  const hasSelectedUsers = useMemo(() => state.selectedUserIds.length > 0, [state.selectedUserIds]);

  /**
   * Loads users based on current pagination and filter settings
   * @private
   * @since 1.0.0
   */
  const loadUsers = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await userService.getUsers({
        ...state.pagination,
        ...state.filters,
        ...(state.searchQuery && { search: state.searchQuery })
      } as UserSearchOptions);

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          users: response.data as User[],
          loading: false
        }));
        
        // Notify parent component of user updates
        onUsersUpdate?.(response.data as User[]);
      } else {
        throw new Error(response.error || 'Failed to load users');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false
      }));
      onError?.(errorMessage);
    }
  }, [userService, state.pagination, state.filters, state.searchQuery, onUsersUpdate, onError]);

  /**
   * Loads user statistics
   * @private
   * @since 1.0.0
   */
  const loadStats = useCallback(async () => {
    if (!showStats) return;

    try {
      const response = await userService.getUserStats();
      if (response.success && response.data) {
        const statsData = response.data;
        setState(prev => ({ 
          ...prev, 
          stats: {
            total: statsData.total,
            active: statsData.active,
            inactive: statsData.inactive,
            suspended: statsData.suspended,
            newThisMonth: statsData.newThisMonth,
            newThisYear: statsData.newThisYear,
            growthRate: statsData.growthRate
          }
        }));
      }
    } catch (error) {
      console.warn('Failed to load user statistics:', error);
    }
  }, [userService, showStats]);

  /**
   * Handles search query changes
   * @param query - New search query
   * @since 1.0.0
   */
  const handleSearch = useCallback((query: string) => {
    setState(prev => ({ 
      ...prev, 
      searchQuery: query,
      pagination: { ...prev.pagination, page: 1 } // Reset to first page
    }));
  }, []);

  /**
   * Handles pagination changes
   * @param newPagination - New pagination settings
   * @since 1.0.0
   */
  const handlePaginationChange = useCallback((newPagination: Partial<PaginationParams>) => {
    setState(prev => ({
      ...prev,
      pagination: { ...prev.pagination, ...newPagination }
    }));
  }, []);

  /**
   * Handles filter changes
   * @param newFilters - New filter settings
   * @since 1.0.0
   */
  const handleFilterChange = useCallback((newFilters: Partial<FilterParams>) => {
    setState(prev => ({
      ...prev,
      filters: { ...prev.filters, ...newFilters },
      pagination: { ...prev.pagination, page: 1 } // Reset to first page
    }));
  }, []);

  /**
   * Handles user selection for bulk operations
   * @param userId - ID of the user to toggle selection
   * @param selected - Whether the user is selected
   * @since 1.0.0
   */
  const handleUserSelection = useCallback((userId: string, selected: boolean) => {
    setState(prev => ({
      ...prev,
      selectedUserIds: selected
        ? [...prev.selectedUserIds, userId]
        : prev.selectedUserIds.filter(id => id !== userId)
    }));
  }, []);

  /**
   * Handles bulk selection of all users on current page
   * @param selected - Whether to select all users
   * @since 1.0.0
   */
  const handleBulkSelection = useCallback((selected: boolean) => {
    setState(prev => ({
      ...prev,
      selectedUserIds: selected ? state.users.map(user => user.id) : []
    }));
  }, [state.users]);

  /**
   * Handles bulk user updates
   * @param updateData - Data to update for selected users
   * @since 1.0.0
   */
  const handleBulkUpdate = useCallback(async (updateData: any) => {
    if (!hasSelectedUsers) return;

    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const response = await userService.bulkUpdateUsers(state.selectedUserIds, updateData);
      
      if (response.success) {
        // Reload users to reflect changes
        await loadUsers();
        // Clear selection
        setState(prev => ({ ...prev, selectedUserIds: [] }));
      } else {
        throw new Error(response.error || 'Bulk update failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bulk update failed';
      setState(prev => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [hasSelectedUsers, state.selectedUserIds, userService, loadUsers, onError]);

  /**
   * Handles user deletion
   * @param userId - ID of the user to delete
   * @param force - Whether to force deletion
   * @since 1.0.0
   */
  const handleDeleteUser = useCallback(async (userId: string, force: boolean = false) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      setState(prev => ({ ...prev, loading: true }));
      
      const response = await userService.deleteUser(userId, force);
      
      if (response.success) {
        // Reload users to reflect changes
        await loadUsers();
        // Remove from selection if selected
        setState(prev => ({
          ...prev,
          selectedUserIds: prev.selectedUserIds.filter(id => id !== userId)
        }));
      } else {
        throw new Error(response.error || 'Failed to delete user');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
      setState(prev => ({ ...prev, error: errorMessage }));
      onError?.(errorMessage);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [userService, loadUsers, onError]);

  /**
   * Handles user row click
   * @param user - User that was clicked
   * @since 1.0.0
   */
  const handleUserClick = useCallback((user: User) => {
    onUserSelect?.(user);
  }, [onUserSelect]);

  // Load users and stats on component mount and when dependencies change
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  // Render loading state
  if (state.loading && state.users.length === 0) {
    return (
      <div className={`user-table-loading ${className}`}>
        <div className="loading-spinner">Loading users...</div>
      </div>
    );
  }

  // Render error state
  if (state.error && state.users.length === 0) {
    return (
      <div className={`user-table-error ${className}`}>
        <div className="error-message">
          <h3>Error Loading Users</h3>
          <p>{state.error}</p>
          <button onClick={loadUsers}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`user-table ${className}`}>
      {/* Header Section */}
      <div className="user-table-header">
        <h2>User Management</h2>
        
        {/* Statistics */}
        {showStats && state.stats && (
          <div className="user-stats">
            <div className="stat-item">
              <span className="stat-label">Total Users:</span>
              <span className="stat-value">{state.stats.total}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Active:</span>
              <span className="stat-value active">{state.stats.active}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Inactive:</span>
              <span className="stat-value inactive">{state.stats.inactive}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Suspended:</span>
              <span className="stat-value suspended">{state.stats.suspended}</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls Section */}
      <div className="user-table-controls">
        {/* Search Bar */}
        {showSearch && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={state.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            <button 
              onClick={() => loadUsers()}
              className="search-button"
              disabled={state.loading}
            >
              Search
            </button>
          </div>
        )}

        {/* Filter Controls */}
        <div className="filter-controls">
          <select
            value={state.filters.status || ''}
            onChange={(e) => handleFilterChange({ status: e.target.value || undefined })}
            className="filter-select"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            value={state.pagination.sortBy}
            onChange={(e) => handlePaginationChange({ sortBy: e.target.value })}
            className="sort-select"
          >
            <option value="createdAt">Created Date</option>
            <option value="username">Username</option>
            <option value="fullName">Full Name</option>
            <option value="email">Email</option>
          </select>

          <select
            value={state.pagination.sortOrder}
            onChange={(e) => handlePaginationChange({ sortOrder: e.target.value as 'asc' | 'desc' })}
            className="sort-order-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && hasSelectedUsers && (
          <div className="bulk-actions">
            <span className="selected-count">
              {state.selectedUserIds.length} user(s) selected
            </span>
            <button
              onClick={() => handleBulkUpdate({ isActive: true })}
              className="bulk-action-btn activate"
              disabled={state.loading}
            >
              Activate
            </button>
            <button
              onClick={() => handleBulkUpdate({ isActive: false })}
              className="bulk-action-btn deactivate"
              disabled={state.loading}
            >
              Deactivate
            </button>
            <button
              onClick={() => setState(prev => ({ ...prev, selectedUserIds: [] }))}
              className="bulk-action-btn clear"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="user-table-container">
        <table className="user-table-content">
          <thead>
            <tr>
              {showBulkActions && (
                <th className="checkbox-column">
                  <input
                    type="checkbox"
                    checked={state.selectedUserIds.length === state.users.length && state.users.length > 0}
                    onChange={(e) => handleBulkSelection(e.target.checked)}
                    className="bulk-select-checkbox"
                  />
                </th>
              )}
              <th>User</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map(user => (
              <tr 
                key={user.id} 
                className={`user-row ${state.selectedUserIds.includes(user.id) ? 'selected' : ''}`}
                onClick={() => handleUserClick(user)}
              >
                {showBulkActions && (
                  <td className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={state.selectedUserIds.includes(user.id)}
                      onChange={(e) => handleUserSelection(user.id, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="user-select-checkbox"
                    />
                  </td>
                )}
                <td className="user-info">
                  <div className="user-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.fullName} />
                    ) : (
                      <div className="avatar-placeholder">
                        {user.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.fullName}</div>
                    <div className="user-username">@{user.username}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </td>
                <td className="user-status">
                  {renderUserStatus ? (
                    renderUserStatus(user)
                  ) : (
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </td>
                <td className="user-created">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="user-actions">
                  {renderUserActions ? (
                    renderUserActions(user)
                  ) : (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit action
                        }}
                        className="action-btn edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteUser(user.id);
                        }}
                        className="action-btn delete"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="user-table-pagination">
        <div className="pagination-info">
          Showing {((state.pagination.page - 1) * state.pagination.limit) + 1} to{' '}
          {Math.min(state.pagination.page * state.pagination.limit, state.users.length)} of{' '}
          {state.users.length} users
        </div>
        
        <div className="pagination-controls">
          <button
            onClick={() => handlePaginationChange({ page: state.pagination.page - 1 })}
            disabled={state.pagination.page <= 1}
            className="pagination-btn prev"
          >
            Previous
          </button>
          
          <span className="page-info">
            Page {state.pagination.page}
          </span>
          
          <button
            onClick={() => handlePaginationChange({ page: state.pagination.page + 1 })}
            disabled={state.users.length < state.pagination.limit}
            className="pagination-btn next"
          >
            Next
          </button>
        </div>

        <div className="page-size-controls">
          <label htmlFor="page-size">Show:</label>
          <select
            id="page-size"
            value={state.pagination.limit}
            onChange={(e) => handlePaginationChange({ 
              limit: parseInt(e.target.value),
              page: 1 // Reset to first page when changing page size
            })}
            className="page-size-select"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Loading Overlay */}
      {state.loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">Updating...</div>
        </div>
      )}
    </div>
  );
};