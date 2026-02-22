/**
 * GenderToggle — Shared reusable gender selector
 *
 * Props:
 *  value      {string}   — current selected value ('Male' | 'Female')
 *  onChange   {fn}       — called with the new value string
 *  error      {string}   — optional error message
 *  options    {Array}    — optional custom options array (default: ['Male','Female'])
 *
 * Usage:
 *   <GenderToggle
 *     value={formik.values.gender}
 *     onChange={(val) => formik.setFieldValue('gender', val)}
 *     error={formik.touched.gender && formik.errors.gender}
 *   />
 */

import React from 'react';
import styles from './GenderToggle.module.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

/* Color map — add more keys if you extend options */
const OPTION_COLORS = {
  Male:   { active: '#155DFC', dot: '#155DFC' },
  Female: { active: '#E60076', dot: '#E60076' },
};
const DEFAULT_COLOR = { active: '#333CF5', dot: '#333CF5' };

const DEFAULT_OPTIONS = ['Male', 'Female'];

export default function GenderToggle({
  value,
  onChange,
  error,
  options = DEFAULT_OPTIONS,
  label = 'Gender',
  required = true,
}) {
  return (
    <div className={styles.group}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}

      <div className={styles.row}>
        {options.map((opt) => {
          const isSelected = value === opt;
          const colors = OPTION_COLORS[opt] ?? DEFAULT_COLOR;

          return (
            <button
              key={opt}
              type="button"
              className={styles.btn}
              style={
                isSelected
                  ? {
                      background: colors.active,
                      color: '#fff',
                      borderColor: colors.active,
                      boxShadow: `0 4px 14px ${colors.active}44`,
                    }
                  : {
                      background: '#ffffff',
                      color: '#364153',
                      borderColor: '#d1d5dc',
                    }
              }
              onClick={() => onChange(opt)}
            >
              {/* Radio circle */}
              <span
                className={styles.radio}
                style={
                  isSelected
                    ? {
                        borderColor: '#fff',
                        background: '#fff',
                        boxShadow: `inset 0 0 0 4px ${colors.dot}`,
                      }
                    : {
                        borderColor: '#d1d5dc',
                        background: '#fff',
                      }
                }
              />
              {opt}
            </button>
          );
        })}
      </div>

      {error && (
        <span className={styles.errorText}>
          <HiOutlineExclamationCircle className={styles.errorIcon} />
          {error}
        </span>
      )}
    </div>
  );
}
