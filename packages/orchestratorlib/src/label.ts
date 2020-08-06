/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {LabelType} from './labeltype';
import {Span} from './span';

export class Label {
  public static newIntentLabel(label: string, spanOffset: number = 0, spanLength: number = 0): Label {
    return new Label(LabelType.Intent, label, new Span(spanOffset, spanLength));
  }

  constructor(labeltype: LabelType, name: string, span: Span) {
    this.labeltype = labeltype;
    this.name = name;
    this.span = span;
  }

  public toObject(): {
    'name': string;
    'labeltype': number;
    'span': {
      'offset': number;
      'length': number; }; } {
    return {
      name: this.name,
      labeltype: this.labeltype,
      span: this.span.toObject(),
    };
  }

  public equals(other: Label): boolean {
    if (other) {
      if (other.name !== this.name) {
        return false;
      }
      if (other.labeltype !== this.labeltype) {
        return false;
      }
      if (this.span) {
        if (!this.span.equals(other.span)) {
          return false;
        }
        return true;
      }
    }
    return false;
  }

  public labeltype: LabelType;

  public name: string;

  public span: Span;
}
