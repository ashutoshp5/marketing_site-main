import React, { useEffect, useMemo, useState } from 'react';
import { getApiBaseUrl } from '../lib/apiBase';

const OpenRoles = () => {
  const API_BASE_URL = useMemo(() => getApiBaseUrl(), []);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/roles`);
        if (!response.ok) throw new Error('Failed to fetch roles');
        const data = await response.json();
        if (cancelled) return;
        setRoles(Array.isArray(data) ? data : []);
      } catch (_err) {
        if (cancelled) return;
        // If API fails, keep roles empty and show default empty state
        setRoles([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL]);

  return (
    <div className="bg-white p-4 sm:p-8 md:p-16">
      <div className="max-w-7xl mx-auto">

        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Open Roles
          </h1>
          <p className="text-lg text-teal-600 max-w-3xl">
            Explore career opportunities at Kifayti Health.
          </p>
        </div>

        {/* Roles / Empty State */}
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">Loading roles...</p>
          </div>
        ) : roles.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-xl font-semibold text-gray-800 mb-2">
              No open positions right now
            </p>
            <p className="text-gray-500 max-w-xl mx-auto">
              We’re not actively hiring at the moment, but if you believe you can add value,
              we’d still love to hear from you.
            </p>
          </div>
        ) : (
          <div className="mb-12">
            {roles.map((role, index) => (
              <div key={role._id || role.id || index}>
                <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h2 className="font-bold text-lg text-gray-900 mb-1">
                      {role.title}
                    </h2>
                    <p className="text-teal-600">{role.description}</p>
                  </div>

                  <div className="text-teal-600">
                    {role.location || '-'}
                  </div>

                  <div className="text-gray-400">
                    {role.department || '-'}
                  </div>
                </div>
                {index < roles.length - 1 && (
                  <hr className="border-teal-200" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-6">
          
          <span className="text-teal-600 mb-4 sm:mb-0">
            {roles.length==0 ? "Don’t see the role you’re looking for?" : "Send your resume and desired role to contactus@kifaytihealth.com"}
          </span>
          <a
            href="/contact"
            className="text-gray-900 font-semibold hover:underline"
          >
            Get in touch with us
          </a>
        </div>

      </div>
    </div>
  );
};

export default OpenRoles;
